const AdSenseScript = () => {
    const scr = document.createElement('script')
    // scr.setAttribute('type', 'text/javascript')
    scr.setAttribute('src', 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js')
    scr.setAttribute('data-ad-client', 'ca-pub-8137627590685100')
    scr.setAttribute('async', 'true')
    document.head.appendChild(scr)
}

export default AdSenseScript