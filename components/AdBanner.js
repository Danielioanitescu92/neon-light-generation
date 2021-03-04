import React, { useEffect } from "react"
const GA_TRACKING_ID = 'G-87DDSFQV0K'

const AdBanner = () => {

    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({})
        } catch (err) {
            console.log(err)
        }
    }, [])

    // if ERROR: UnhandledPromiseRejectionWarning: ReferenceError: window is not defined
    // useEffect(()=> {
    //     if(typeof window !== 'undefined'){
    //         (window.adsbygoogle = window.adsbygoogle || []).push({})
    //     }
    // }, [])

    return (
        <ins
            className="adsbygoogle adbanner-customize"
            style={{ display: "block" }}
            data-ad-client={GA_TRACKING_ID}
            // data-ad-slot={slot-id}
            // data-ad-layout={layout}
            // data-ad-layout-key={layoutKey}
            // data-ad-format={format}
            // data-full-width-responsive={responsive}
            // enable_page_level_ads: true
        />
    )
}

export default AdBanner