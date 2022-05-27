import React, { FC, useState } from 'react';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

interface Form {
    status: string;
    message?: string;
    subscribe: (formData) => void;
}

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const Form: FC<Form> = ({ subscribe, message, status }): JSX.Element => {
    const [checked, setChecked] = useState<boolean>(false);
    const [validateMessage, setValidateMessage] = useState<string>('');
    return !status ? (
        <form onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.target as HTMLFormElement);
            const email = data.get('EMAIL');
            const GDPR = data.get('gdpr[24136]');
            const beta = data.get('group[84812][1]');
            const validEmail = validateEmail(email);

            if (!validEmail && !GDPR) {
                setValidateMessage('Please use a valid email and enable marketing emails.');
                setTimeout(() => {
                    setValidateMessage('');
                }, 10000);
                return;
            } else if (!validEmail && GDPR) {
                setValidateMessage('Please use a valid email address.');
                setTimeout(() => {
                    setValidateMessage('');
                }, 10000);
                return;
            } else if (validEmail && !GDPR) {
                setValidateMessage('Please allow us to send you emails by checking the box below.');
                setTimeout(() => {
                    setValidateMessage('');
                }, 10000);
                return;
            }

            const payload = {
                EMAIL: email,
                'gdpr[24136]': GDPR,
            };

            if (beta) {
                payload['group[84812][1]'] = beta;
            }

            subscribe(payload);
        }}>
            <div className="grid grid-cols-4 max-w-4xl mx-auto">
                <div className="col-span-3">
                    <input type="email" name="EMAIL" className="mailchimp-email block w-full px-4 py-4 rounded-l-lg border-r-0 outline-primary-200 focus:outline-none" placeholder="hello@example.com" />
                </div>
                <div className="col-span-1">
                    <input type="submit" className={`cursor-pointer bg-primary-100 hover:bg-dark-100 focus:bg-dark-100 hover:shadow-lg} form-input m-0 block py-4 px-6 text-white text-center rounded-r-lg inline-block font-bold h-full w-full`} value="Join the Waitlist" />
                </div>
            </div>
            {validateMessage.length ? <p className="text-sm mt-1"><em>{validateMessage}</em></p> : ''}
            <fieldset name="interestgroup_field" className="flex items-center justify-center mt-4">
                <div className="flex items-center m-2 text-sm">
                    <input className="form-checkbox text-primary-200 rounded focus:ring-primary-200" id="gdpr" name="gdpr[24136]" type="checkbox" checked={checked} onChange={() => setChecked(!checked)} value={checked ? 'Y' : 'N'}/>
                    <label className="ml-2 text-white" htmlFor="gdpr">I agree to receive marketing emails. <a href="#mailchimp">*</a></label>
                </div>
                <div className="flex items-center m-2 text-sm">
                    <input className="form-checkbox text-primary-200 rounded focus:ring-primary-200" defaultValue="1" id="betaOptin" name="group[84812][1]" type="checkbox" />
                    <label className="ml-2 text-white" htmlFor="betaOptin">Get notified of beta launch</label>
                </div>
            </fieldset>
            {message}
        </form>
    ) : (
        <>
            {status === "sending" && <p>Sending details...</p>}
            {status === "error" && <div dangerouslySetInnerHTML={{__html: message}}/>}
            {status === "success" && <p><strong>Almost there!</strong> Check your email and verify your subscription, and don't forget to <a className="font-bold text-primary-200 underline" href="https://twitter.com/adahandle">follow us on Twitter</a>. Thank you for your interest!</p>}
        </>
    )
}

const MailchimpForm = (): JSX.Element => (
    <MailchimpSubscribe
        url={'https://clvnk.us2.list-manage.com/subscribe/post?u=946526142d903ddb83f252eca&amp;id=28722b6d9e'}
        render={({ subscribe, status, message }) => <Form subscribe={subscribe} status={status} message={message} />}
    />
)

export default MailchimpForm;
