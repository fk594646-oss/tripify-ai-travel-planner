import Contact from "../models/Contacts.js";
export const sendContactMessage = async (req, res) => {

    try {

        console.log(req.body);

        const { name, email, subject, message } = req.body;

        const newContact = new Contact({
            name,
            email,
            subject,
            message
        });

        await newContact.save();

        res.status(201).json({
            success: true,
            message: "Message Saved Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};