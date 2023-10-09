import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom"; 

export const Home = () => {
	return (
		<div>
			<p>Home</p>
            <Link to="/"><Button>Log Out</Button></Link>
		</div>
	);
};
