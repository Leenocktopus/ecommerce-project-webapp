import React, {Component} from "react";


class Footer extends Component {

    render() {
        return (
            <footer>
                <div className="container">
                    <ul style={{textAlign: "center"}}>
                        <li><a>Гарантії</a></li>
                        <li><a>Умови обслуговування</a></li>
                        <li><a>Співробітництво</a></li>
                    </ul>
                    <p style={{clear: "both"}}> EM-service &copy; 2020. All Rights Reserved.</p>
                </div>
            </footer>
        );
    }
}

export default Footer;