import React, { useState } from 'react'

import Card from '../../../../Components/shared/Card/Card'
import Button from '../../../../Components/shared/Button/Button'
import styles from '../StepPhoneEmail.module.css';
import TextInput from '../../../../Components/shared/TextInput/TextInput';



const Email = ({onNext}) => {

    const [email, setEmail] = useState()

    return (
        <Card title="Welcome to Codershouse!" icon="email-emoji">
            <TextInput value={email} placeholder={"Enter your Email"} onChange={(e)=>setEmail(e.target.value)} />
            <div>
                <div className={styles.actionButtonWrap}>
                    <Button text="Next" onClick={onNext} />
                </div>
                <p className={styles.bottomParagraph}>
                    By entering your email, you’re agreeing to our Terms of
                    Service and Privacy Policy. Thanks!
                </p>
            </div>
        </Card>
    )
}

export default Email