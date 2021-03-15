import axios from "./myAxios";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            user: null,
            uploaderVisible: false,
        };
    }

    componentDidMount() {
        axios.get("api/user").then((response) => {
            this.setState({
                user: response.data.user,
            });
        });
    }

    render() {
        const { user, uploaderVisible } = this.state.user;

if(!user){
    return <h1>Loading</h1>
}

        return (
        
                <div>
                    <Welcome, {user.firstname} />
                    <ProfilePicture url={user.profile_picture_url}
                    clickHandler={() => this.setState = uploaderVisible: true}
                </div>
              
        );
    }
}
