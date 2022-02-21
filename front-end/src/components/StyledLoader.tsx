import styled from 'styled-components'
import LoadingOverlay from "react-loading-overlay";
const StyledLoader = styled(LoadingOverlay)`
  width: 100vw;
  height: 100vh;
  overflow: scroll;
  &.MyLoader_wrapper--active {
    overflow: hidden;
  }
`
 
export default function MyLoader({ active, children }:{ active:boolean, children:any }) {
  return (
    <StyledLoader
      active={active}
      classNamePrefix='MyLoader_'
      text="Loading your content..."
      spinner
    >
      {children}
    </StyledLoader>
  )
}