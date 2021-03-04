import dbConnect from '../../../utils/dbConnect'
import User from '../../../models/User'
import sgMail from '@sendgrid/mail'
const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS

export default async function handler(req, res) {
    console.log("1")
    await dbConnect()

    switch (req.method) {
        case 'POST':
            console.log("2")
            try {
                const { email, name, subject, text } = req.body;
            
                if(!email || !name || !subject || !text) {
                    console.log("3")
                    return res.status(400).json({ msg: "Plase enter all fields" });
                }
            
                const user = await User.findOne({ role: 'admin' })
                
                    if(user) {
                        console.log("4")

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
                            console.log("5")
                            res.status(200).json({ msg: 'Your email has been sent' })
                        })
                        .catch((error) => {
                            console.log("6")
                            res.status(400).json({ msg: 'There was an error' });
                        })
                    
                    } else {
                        console.log("7")
                        res.status(400).json({ msg: "User's email not found" });
                    }
            } catch (error) {
                console.log("8")
                res.status(404).json({ msg: "Not possible to contact admin" })
            }
            break
        default:
            res.status(404).json({ msg: "Contact admin not available now" })
        break
    }
}
