import dbConnect from '../../../utils/dbConnect'
import User from '../../../models/User'
import sgMail from '@sendgrid/mail'
const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS

export default async function handler(req, res) {
    await dbConnect()

    switch (req.method) {
        case 'POST':
            try {
                const { email, name, subject, text } = req.body;
            
                if(!email || !name || !subject || !text) {
                    return res.status(400).json({ msg: "Plase enter all fields" });
                }
            
                const user = await User.findOne({ role: 'admin' })
                
                    if(user) {

                        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
                        const msg = {
                            to: `${EMAIL_ADDRESS}`,
                            from: `${EMAIL_ADDRESS}`, // the VERIFIED email
                            fromname: `${name}`,
                            subject: `${subject}`,
                            text: `From: ${email} \n\n` + `Text: ${text}`,
                            html: `From: ${email} \n\n` + `Text: <strong>${text}</strong>`
                        }
                        await sgMail
                        .send(msg)
                        .then(() => {
                            res.status(200).json({ msg: 'Your email has been sent' })
                        })
                        .catch((error) => {
                            res.status(400).json({ msg: 'There was an error' });
                        })
                    
                    } else {
                        res.status(400).json({ msg: "User's email not found" });
                    }
            } catch (error) {
                res.status(404).json({ msg: "Not possible to contact admin" })
            }
            break
        default:
            res.status(404).json({ msg: "Contact admin not available now" })
        break
    }
}
