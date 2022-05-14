import SendResponse from "../repositories/response.repository";

/**
 * Function to send response
 * @param req
 * @param res
 */
export const sendResponse = async (req, res) => {
    if (req.params.userId && req.params.messageId && req.body) {
        try {
            const response = await SendResponse.sendResponse(req.params.userId, req.params.messageId, req.body);
            if (response.success) {
                res.json(response);
            } else {
                res.json({error: "Error in creating the answer."})
            }
        } catch (err) {
            res.json({message: err});
        }
    }
};