import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html>
				<Head>
					<meta charSet="utf-8" />
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no"
					/>
					<meta name="description" content="My First Static Website" />
					<meta name="keywords" content="nextjs,static,website" />
					<style global jsx>
						{`
							html,
							body,
							#__next {
								height: 100%;
								width: 100%;
								overflow: hidden;
							}
						`}
					</style>
				</Head>{" "}
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
