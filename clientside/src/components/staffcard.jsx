import staffcardCSS from "./staffcard.module.css";

function Staffcard(props) {
  return (
    <div className={staffcardCSS.card}>
      <div className={staffcardCSS.firstDiv}>
        <img src={props.imageUrl} alt="staff" />
        <h5>{props.name}</h5>
        <hr />
      </div>
      <div className={staffcardCSS.secondDiv}>
        <p>{props.bio}</p>
        <h6>Skills:</h6>
        <ul>
          <hr />
          {props.skills.map((element, index) => {
            return (
              <div key={index}>
                <li>{element}</li>
                <hr />
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
export default Staffcard;
