import './styles.css'
import { FC, CSSProperties } from 'react'
import { alphaLogo } from "../../assets"

interface Props {
    style?: CSSProperties
    width?: CSSProperties['width'];
    height?: CSSProperties['height'];
}

/**
 * Logo de la emporesa
 */
export const Logo: FC<Props> = ({ width, height, style }) => {
    return (
        <div className='logo-container'>
            <img style={style} width={width} height={height} src={alphaLogo} alt="logo alpha" />
        </div>
    )
}
