/**
 * @author Allen Liu
 * @desc An image preview component based on React Hook.
 */
import { useState, useMemo, useRef } from 'react'

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
const usePreviewer = () => {
	const imgRef = useRef(null)
	const [object, setObject] = useState(() => ({
		open: false,
		style: {}
	}))
	const GetPreviewImageSize = (url, scale=0.7) => {
		return new Promise((resolve, reject) => {
			let image = imgRef.current
			image.onload = () => {
				let width, height
				const imgWidth = image.width//Image original width
				const imgHeight = image.height//Image original height
				const winWidth = window.screen.width//Window screen width
				const winHeight = window.screen.height//Window screen height
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
	const closePreviewer = () => {
		setObject({
			open: false,
			style: {}
		})
		imgRef.current.src = ''
	}
	const openPreviewer = (url) => {
		GetPreviewImageSize(url)
			.then(({ width, height }) => {
				setObject({
					open: true,
					style: {
						display: 'block',
						width: width,
						height: height
					}
				})
			})
			.catch(() => {})
	}
	const { open, style } = object
	const previewer = useMemo(() => {
		const ctxStyle = {
			...FullScreenStyle,
			display: open ? 'block' : 'none'
		}
		return <div style={ctxStyle} onClick={closePreviewer}>
			<div style={AbsoluteCenterStyle}>
				<img ref={imgRef} style={style || {}} />
			</div>
		</div>
	}, [open])
	return [previewer, openPreviewer]
}
export default usePreviewer
