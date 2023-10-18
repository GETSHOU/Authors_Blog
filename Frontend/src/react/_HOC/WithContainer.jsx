import { Container } from "../components/Container/Container";

export const WithContainer = (Component) => {
  return function ContainerHOC(props) {
    return (
			<Container>
				<Component {...props}/>
			</Container>
    );
  }
}
