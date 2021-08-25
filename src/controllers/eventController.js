const model = require("../models/event");
const responser = require("../helpers/responser");
const { isValidObjectId } = require("mongoose");
require("../models/user");
module.exports = {
  getById: async (req, res) => {
    let roleFind = {};
    switch (req.userData.role) {
      case 0:
        roleFind.hr = req.userData._id;
        break;
      case 1:
        roleFind.vendor = req.userData._id;
        break;
    }
    const events = await model
      .find(roleFind)
      .populate({ path: "hr", select: "-password -username -role" })
      .populate({ path: "vendor", select: "-password -username -role" })
      .sort({ date_created: -1 });

    const role = req.userData.role === 0 ? "HR" : "Vendor";
    return responser.ok_200(res, `Success getting events by ID ${role}`, {
      events,
      role
    });
  },

  create: async (req, res) => {
    if (
      !req.body.name ||
      !isValidObjectId(req.body.vendor) ||
      !req.body.location ||
      !req.body.date ||
      req.body["date"].length !== 3
    )
      return responser.badRequest_400(
        res,
        "Please fill event's name, vendor, location and date"
      );

    try {
      const data = {
        name: req.body.name,
        company: req.userData.company,
        hr: req.userData._id,
        vendor: req.body.vendor,
        proposed_location: req.body.location,
        proposed_date: [...req.body.date.map((el) => new Date(el))],
        date_created: new Date(),
        status: "Pending"
      };
      await model.create(data);
      return responser.created_201(res, "Success create event!");
    } catch (e) {
      console.error(e);
      return responser.internalServerError_500(
        res,
        "Oops, error occured in our system",
        { trace: e, string: JSON.stringify(e) }
      );
    }
  },

  confirm: async (req, res) => {
    if (!isValidObjectId(req.params.id))
      return responser.badRequest_400(res, "Oops, event identity is invalid");

    if (!req.body.status)
      return responser.badRequest_400(
        res,
        "Oops, enter status (Approve / Reject)"
      );

    let eventData = await model.findOne({
      _id: req.params.id,
      vendor: req.userData._id
    });

    if (!eventData)
      return responser.notFound_404(
        res,
        "Oops, event is invalid or you are not a vendor at the event!"
      );

    if (eventData.status.toLowerCase() !== "pending")
      return responser.notAccepted_406(
        res,
        "Oops, this event is already confirmed!"
      );
    try {
      switch (req.body.status.toLowerCase()) {
        case "approve":
          if (!req.body.approved_date)
            return responser.badRequest_400(
              res,
              "Oops, to approve the event, an approved date is required!"
            );

          const allowedDate = await eventData.proposed_date.some((el) => {
            return el.getTime() === new Date(req.body.approved_date).getTime();
          });

          if (!allowedDate)
            return responser.badRequest_400(
              res,
              "Oops, please select 1 of 3 proposed datetimes to confirm"
            );

          eventData.status = "Approve";
          eventData.approved_date = new Date(req.body.approved_date);

          await eventData.save();
          return responser.ok_200(res, "Success approve event");

        case "reject":
          if (!req.body.reason)
            return responser.badRequest_400(
              res,
              "Oops, to reject the event, a reason is required!"
            );

          eventData.status = "Reject";
          eventData.remarks = req.body.reason;

          await eventData.save();
          return responser.ok_200(res, "Success approve event");
        default:
          return responser.badRequest_400(
            res,
            "Oops, enter status (Approve / Reject)"
          );
      }
    } catch (e) {
      console.error(e);
      return responser.internalServerError_500(
        res,
        "Oops, error occured in our system",
        { trace: e, string: JSON.stringify(e) }
      );
    }
  }
};
