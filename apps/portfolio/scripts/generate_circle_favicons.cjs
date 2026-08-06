const sharp = require('sharp');
const path = require('path');

const inputPath = path.join(__dirname, '../static/me.jpg');
const outputDir = path.join(__dirname, '../static');

async function main() {
	const metadata = await sharp(inputPath).metadata();
	const size = Math.max(metadata.width, metadata.height);

	const squaredImage = await sharp(inputPath)
		.resize({
			width: size,
			height: size,
			fit: 'contain',
			background: { r: 255, g: 255, b: 255, alpha: 1 }
		})
		.toBuffer();

	const circleSvg = Buffer.from(
		`<svg width="${size}" height="${size}">
			<circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/>
		</svg>`
	);

	const roundedBuffer = await sharp(squaredImage)
		.composite([{ input: circleSvg, blend: 'dest-in' }])
		.png()
		.toBuffer();

	const sizes = [
		{ name: 'favicon.png', size: 32 },
		{ name: 'favicon-16x16.png', size: 16 },
		{ name: 'favicon-32x32.png', size: 32 },
		{ name: 'apple-touch-icon.png', size: 180 },
		{ name: 'icon-192x192.png', size: 192 },
		{ name: 'icon-512x512.png', size: 512 }
	];

	for (const s of sizes) {
		await sharp(roundedBuffer)
			.resize(s.size, s.size)
			.toFile(path.join(outputDir, s.name));
		console.log(`Generated circular favicon: ${s.name}`);
	}
}

main().catch(console.error);
