/**
 * @author Allen Liu
 * @desc An image preview component based on React Hook.
 */
import { useState, useMemo } from 'react'

const FullScreenStyle = {
	position: 'fixed',
	top: 0,
	bottom: 0,
	left: 0,
	right: 0,
	backgroundColor: 'rgba(0, 0, 0, .8)',
	zIndex: 999
}
const AbsoluteCenterStyle = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	marginRight: '-50%',
	MsTransform: 'translate(-50%, -50%)',
	MozTransform: 'translate(-50%, -50%)',
	WebkitTransform: 'translate(-50%, -50%)',
	OTransform: 'translate(-50%, -50%)',
	transform: 'translate(-50%, -50%)'
}
const GetPreviewImageSize = (url, scale=0.7) => {
	return new Promise((resolve, reject) => {
		let image = new Image()
		image.onload = () => {
			let width, height
			const imgWidth = image.width,//Image original width
				imgHeight = image.height//Image original height
			const winWidth = window.screen.width,//Window screen width
				winHeight = window.screen.height//Window screen height
			const imageRate = imgWidth / imgHeight//Image true aspect ratio
			const winRate = winWidth / winHeight//Screen aspect ratio
			const isLandscape = imgWidth > imgHeight//Is the image in landscape
			//The actual image aspect ratio is greater than or equal to the screen aspect ratio, then take the width of the screen as the size of the base standard to ensure that the full image is displayed in one screen
			if (imageRate >= winRate) {
				width = isLandscape ? winWidth : winWidth * scale
				height = width / imageRate
			//The actual image aspect ratio is smaller than the screen aspect ratio, then take the height of the screen as the base standard size to ensure that the full image is displayed in one screen
			} else {
				height = winHeight * scale
				width = height * imageRate
			}
			resolve({
				width: width + 'px',
				height: height + 'px'
			})
		}
		image.onerror = err => reject(err)
		image.src = url
	})
}
const usePreviewer = () => {
	const [object, setObject] = useState(() => ({
		open: false,
		url: '',
		style: {}
	}))
	const ClosePreviewer = () => {
		setObject({
			open: false,
			url: '',
			style: {}
		})
	}
	const OpenPreviewer = (url) => {
		GetPreviewImageSize(url)
			.then(({ width, height }) => {
				setObject({
					open: true,
					url: url,
					style: {
						display: 'block',
						width: width,
						height: height
					}
				})
			})
			.catch(() => {})
	}
	const { open, url, style } = object
	const Previewer = useMemo(() => {
		if (open) {
			return <div style={FullScreenStyle} onClick={ClosePreviewer}>
				<div style={AbsoluteCenterStyle}>
					<img style={style || {}} src={url}/>
				</div>
			</div>
		}
		return null
	}, [open])
	return {
		OpenPreviewer,
		Previewer
	}
}
export default usePreviewer
