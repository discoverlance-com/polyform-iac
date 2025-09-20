type SeoOptions = {
	title?: string
	description?: string
	image?: string
	keywords?: string
}

export const siteSEO = ({
	title = 'Dashboard',
	description = 'Access your PolyForm IAC dashboard',
	keywords,
	image,
}: SeoOptions) => {
	const tags = [
		{ title },
		{ name: 'description', content: description },
		{ name: 'keywords', content: keywords },
		{ property: 'og:type', content: 'website' },
		{ property: 'og:title', content: `${title} | PolyForm IAC` },
		{ property: 'og:description', content: description },
		...(image ? [{ property: 'og:image', content: image }] : []),
	]

	return tags
}
