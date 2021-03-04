const GA_TRACKING_ID = 'G-87DDSFQV0K'

const AnalyticsScript = () => {
    const scr = document.createElement('script')
    // scr.setAttribute('type', 'text/javascript')
    scr.setAttribute('src', `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`)
    scr.setAttribute('async', 'true')
    document.head.appendChild(scr)

    const dangerouslySetInnerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_TRACKING_ID}', {
        page_path: window.location.pathname,                                
        });
    `

    const scra = document.createElement('script')
    // scra.setAttribute('type', 'text/javascript')
    scra.append(dangerouslySetInnerHTML)
    document.head.appendChild(scra)
}

export default AnalyticsScript