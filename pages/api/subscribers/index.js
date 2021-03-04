import dbConnect from '../../../utils/dbConnect'
import Subscriber from '../../../models/Subscriber'
import crypto from 'crypto'
const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS
import sgMail from '@sendgrid/mail'

export default async function handler(req, res) {
    await dbConnect()

    switch (req.method) {
        case 'POST':
            try {
                const email = req.body.email;
                const orig = req.body.orig;
            
                if(req.body.email === '' || !req.body.email) {
                    return res.status(400).json({ msg: 'Email required' });
                }
            
                const sub = await Subscriber.findOne({ email })
                
                    if(sub) {
                        res.status(400).json({ msg: "Subscriber already exists" });
                    } else {

                        const token = crypto.randomBytes(20).toString('hex');
                        const newSub = new Subscriber({ 
                            email: email,
                            ToDeletePasswordToken: token,
                            ToDeletePasswordExpires: Date.now() + 3600000
                        });
                        newSub.save()


                        

                        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
                        const msg = {
                            // to: [`${email}`, `${EMAIL_ADDRESS}`],
                            // from: {
                            //     name: 'Danutz',
                            //     email: `${EMAIL_ADDRESS}`
                            // }, // the VERIFIED email
                            to: `${email}`,
                            from: `${EMAIL_ADDRESS}`, // the VERIFIED email
                            fromname: `Daniel, `,
                            subject: `Welcome to our Newsletter`,
                            text: 
                                'You are receiving this email because you have subscribed to our newsletter. \n\n' +
                                'Starting now, you will receive an email each time a post is released. \n\n' +
                                'Please click the following link to go back to site: \n\n' +
                                `${orig} \n\n` +
                                'Thanks again for your confidence! \n\n' +
                                'We value our clients decisions, so feel free to unsubscribe if you want by clicking the following link. \n\n' + 
                                'Due to safety measurements, the provided link will only be available one hour from now on: \n\n' +
                                `${orig}/unsubscribe/${token} \n\n`,
                            html: 
                                'You are receiving this email because you have subscribed to our newsletter. \n\n' +
                                'Starting now, you will receive an email each time a post is released. \n\n' +
                                'Please click the following link to go back to site: \n\n' +
                                `<strong>${orig}</strong> \n\n` +
                                'Thanks again for your confidence! \n\n' +
                                'We value our clients decisions, so feel free to unsubscribe if you want by clicking the following link. \n\n' + 
                                'Due to safety measurements, the provided link will only be available one hour from now on: \n\n' +
                                `<strong>${orig}/unsubscribe/${token}</strong> \n\n`
                        }
                        await sgMail
                        .send(msg)
                        .then(() => {
                            console.log("5")
                            res.status(200).json({ msg: 'Subscribe email sent' })
                        })
                        .catch((error) => {
                            console.log("6")
                            res.status(400).json({ msg: 'There was an error subscribing' });
                        })
                    }

            } catch (error) {
                res.status(404).json({ replynotfound: "No reply found" })
            }
            break
        default:
            res.status(400).json({ itemnotfound: "No item" })
        break
    }
}
