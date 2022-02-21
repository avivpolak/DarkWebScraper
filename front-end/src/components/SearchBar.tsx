
import { MDBCol, MDBIcon, MDBInput } from "mdbreact";
import { useRef } from "react";


export default function SearchBar({setSearchWord}:{setSearchWord : Function}) {
    const inputEl:any = useRef(null);
  return (
    <div className="center margin">
    <MDBCol md="6">
        <MDBInput
            ref={inputEl}
            onChange={() => {
                setSearchWord((prevState:string) => inputEl?.current.state.innerValue);
            }}
            hint="Search"
            type="text"
            containerClass="active-pink active-pink-2 mt-0 mb-3"
        />
        
    </MDBCol>
</div>
  )
}
