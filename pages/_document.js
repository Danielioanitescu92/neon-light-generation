import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {

    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head>
                    <title>Neon Light Generation</title>
                    <meta property="og:title" content='Neon Light Generation'/>
                    <meta property="og:description" content='Welcoming ideas that can be added by any neon light design enthusiast.'/>
                    <link rel="icon" href="/fav.png" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }

}

export default MyDocument