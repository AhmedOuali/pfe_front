import React, { Component } from 'react';
import constants from './constants';

class AppNoStyle extends React.Component {
    constructor(props) {
        super(props);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.handleViewChange = this.handleViewChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.state = {
            isLoggedIn: null,
            gps:[],
            tasks:[],
            requests:[],
            notifications:[],
            bodyView:constants.VIEW_HOME,
            userCategory: constants.CATEGORY_EMPLOYEE,
            item:{}
        }; 
    }

    handleAuthentication(loggedIn) {
        if(loggedIn) {
            this.fetchData();
        }
        this.setState({isLoggedIn:loggedIn});
    }    

    handleViewChange(view, item) {
        this.setState({bodyView:view, item:item});
    }

    handleCategoryChange() {
        const category = this.state.userCategory == constants.CATEGORY_EMPLOYEE?constants.CATEGORY_MANAGER:constants.CATEGORY_EMPLOYEE;
        this.setState({bodyView: constants.VIEW_HOME, userCategory:category});
        this.fetchData();
    }

    fetchGps(){
        this.setState({gps:["Demande d'absence"]});
    }

    fetchTasks(){
        fetch("http://localhost:8080/hr-business-services-rest/business-services/tasks?roleModel="+this.state.userCategory,
        {
            method: 'get',
            headers: {
                'Accept': 'application/json'
            },
            credentials: 'include'
        })
        .then(res => res.json())
        .then(
            (result) => {
                if(result.task){
                    this.setState({tasks:result.task});
                } else {
                    this.setState({tasks:[]});
                }
                console.log(result);

            },
            (error) => {
                console.log('ERROR !!!');
            }
        )
    }

    fetchNotifications(){
        fetch("http://localhost:8080/hr-business-services-rest/business-services/notifications?roleModel="+this.state.userCategory,
        {
            method: 'get',
            headers: {
                'Accept': 'application/json'
            },
            credentials: 'include'
        })
        .then(res => res.json())
        .then(
            (result) => {
                if(result.notification){
                    this.setState({notifications:result.notification});
                } else {
                    this.setState({notifications:[]});
                }
                console.log(result);

            },
            (error) => {
                console.log('ERROR !!!');
            }
        )
    }

    fetchRequests(){
        fetch("http://localhost:8080/hr-business-services-rest/business-services/requests?roleModel="+this.state.userCategory,
        {
            method: 'get',
            headers: {
                'Accept': 'application/json'
            },
            credentials: 'include'
        })
        .then(res => res.json())
        .then(
            (result) => {
                if(result.request){
                    this.setState({requests:result.request});
                } else {
                    this.setState({requests:[]});
                }
                console.log(result);

            },
            (error) => {
                console.log('ERROR !!!');
            }
        )
    }

    fetchData(){
        this.fetchGps();        
        this.fetchTasks();
        this.fetchNotifications();
        this.fetchRequests();
    }

    componentDidMount() {
        fetch("http://localhost:8080/hr-business-services-rest/business-services/logincookie",
        {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Accept-Language': 'fr-FR'
            },
            credentials: 'include'
        })
        .then(res => res.json())
        .then(
            (result) => {
                const loggedIn = result.status == constants.REQUEST_SUCCESS?true:false;
                if(loggedIn){
                    this.fetchData();
                }
                this.setState({
                    isLoggedIn: loggedIn,
                });                
                console.log(result.status);

            },
            (error) => {
                console.log('ERROR !!!');
            }
        )
    }
    
    render() {
        const isLoggedIn = this.state.isLoggedIn;
        let view;
        if(isLoggedIn === null) {
            view = <SplashContainer />
        } else if (isLoggedIn === true) {
            const Fragment = React.Fragment;
            view = <Fragment>
                    <HeaderContainer userCategory={this.state.userCategory} handleCategoryChange={this.handleCategoryChange} handleAuthentication={this.handleAuthentication} />
                    <BodyContainer view={this.state.bodyView} item={this.state.item} viewChangeHandler={this.handleViewChange} gps={this.state.gps} tasks={this.state.tasks} notifications={this.state.notifications} requests={this.state.requests} />
                    <FooterContainer view={this.state.bodyView} viewChangeHandler={this.handleViewChange} tasksCount={this.state.tasks.length} notificationsCount={this.state.notifications.length} requestsCount={this.state.requests.length} />
                </Fragment>
        } else {
            view = <LoginContainer handleAuthentication={this.handleAuthentication} />
        }
        return (
            <fieldset><legend>App</legend>
            {view}</fieldset>
        );
    }
}

class HeaderContainer extends React.Component {
    constructor(props) {
        super(props);   
    }

    render() { 
        return (
            <fieldset><legend>HeaderContainer</legend>
                <UserCategory category={this.props.userCategory} handleCategoryChange={this.props.handleCategoryChange}/>
                <LogoutButton handleAuthentication={this.props.handleAuthentication}/>
            </fieldset>
        );
    }   
}

class BodyContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() { 
        const view = this.props.view;
        let bodyView = <MenuList viewChangeHandler={this.props.viewChangeHandler} />;
        if(view == constants.VIEW_TASKS){
            bodyView = <TasksList items={this.props.tasks} viewChangeHandler={this.props.viewChangeHandler} />;
        } else if (view == constants.VIEW_NOTIFICATIONS) {
            bodyView = <NotificationsList items={this.props.notifications} viewChangeHandler={this.props.viewChangeHandler} />;
        } else if (view == constants.VIEW_REQUESTS) {
            bodyView = <RequestsList  items={this.props.requests} viewChangeHandler={this.props.viewChangeHandler} />;
        } else if (view == constants.VIEW_GPFORM) {
            bodyView = <GpForm item={this.props.item}/>;
        }   else if (view == constants.VIEW_TASKFORM) {
            bodyView = <TaskForm item={this.props.item}/>;
        }
        return (
            <fieldset><legend>BodyContainer</legend>
                {bodyView}
            </fieldset>
        );
    }   
}

function FooterContainer(props){
    return (
        <fieldset><legend>FooterContainer</legend>
            <HomeButton isActive={props.view == constants.VIEW_HOME} viewChangeHandler={props.viewChangeHandler} />
            <TasksButton isActive={props.view == constants.VIEW_TASKS} itemsCount={props.tasksCount} viewChangeHandler={props.viewChangeHandler} />
            <NotificationsButton isActive={props.view == constants.VIEW_NOTIFICATIONS} itemsCount={props.notificationsCount} viewChangeHandler={props.viewChangeHandler} />
            <RequestsButton isActive={props.view == constants.VIEW_REQUESTS} itemsCount={props.requestsCount} viewChangeHandler={props.viewChangeHandler} />
        </fieldset>
    );
}

function LogoutButton(props) {
    function handleClick(){
        props.handleAuthentication(false);
    }
    return (
        <fieldset><legend onClick={handleClick}>LogoutButton</legend>
        </fieldset>
    );
}

function UserCategory(props) {
    function handleClick(){
        props.handleCategoryChange();
    }
    return (
        <fieldset><legend onClick={handleClick}>UserCategory</legend>
        {props.category}</fieldset>
    );
}

function HomeButton(props){
    const isActive = props.isActive ? 'Active':'';
    function handleClick(e){
        props.viewChangeHandler(constants.VIEW_HOME);
    }
    return (
        <fieldset><legend onClick={handleClick}>HomeButton</legend>
        {isActive}
        </fieldset>
    );
}

function TasksButton(props){
    const isActive = props.isActive ? 'Active':'';
    function handleClick(e){
        props.viewChangeHandler(constants.VIEW_TASKS);
    }
    const itemsCount = props.itemsCount?props.itemsCount:'';
    return (
        <fieldset><legend onClick={handleClick}>TasksButton</legend>
         {itemsCount} {isActive}
        </fieldset>
    );
}

function NotificationsButton(props){
    const isActive = props.isActive ? 'Active':'';
    function handleClick(e){
        props.viewChangeHandler(constants.VIEW_NOTIFICATIONS);
    }
    const itemsCount = props.itemsCount?props.itemsCount:'';
    return (
        <fieldset><legend onClick={handleClick}>NotificationsButton</legend>
         {itemsCount} {isActive}
        </fieldset>
    );
}

function RequestsButton(props){
    const isActive = props.isActive ? 'Active':'';
    function handleClick(e){
        props.viewChangeHandler(constants.VIEW_REQUESTS);
    }
    const itemsCount = props.itemsCount?props.itemsCount:'';
    return (
        <fieldset><legend onClick={handleClick}>RequestsButton</legend>
        {itemsCount} {isActive}
        </fieldset>
    );
}

function MenuList(props){
    return (
        <fieldset><legend>MenuList</legend>
            <MenuItem label="Demande d'absence" viewChangeHandler={props.viewChangeHandler} />
        </fieldset>
    );
}

function MenuItem(props){
    function handleClick(e){
        props.viewChangeHandler(constants.VIEW_GPFORM);
    }
    return (
        <fieldset><legend onClick={handleClick}>MenuItem</legend>
             {props.label}
        </fieldset>
    );
}

function TasksList(props){
    const listItems = props.items.map((item) =>
        <TaskItem value={item} viewChangeHandler={props.viewChangeHandler} />
    );
    return (
        <fieldset><legend>TasksList</legend>
            {listItems}
        </fieldset>
    );
}

function TaskItem(props){
    function handleClick(e){
        props.viewChangeHandler(constants.VIEW_TASKFORM, props.value);
    }
    return(
        <fieldset><legend onClick={handleClick}>TaskItem</legend>
             {props.value['@label']}</fieldset>
    );
}

function NotificationItem(props){
    console.log(props);
    return(
        <fieldset><legend>NotificationItem</legend>
             {props.value['@label']}</fieldset>
    );
}

function RequestsItem(props){
    console.log(props);
    return(
        <fieldset><legend>RequestsItem</legend>
             {props.value['@label']}</fieldset>
    );
}

function NotificationsList(props){
    const listItems = props.items.map((item) =>
        <NotificationItem value={item} />
    );
    return (
        <fieldset><legend>NotificationsList</legend>
            {listItems}
        </fieldset>
    );
}

function RequestsList(props){
    const listItems = props.items.map((item) =>
        <RequestsItem value={item} />
    );
    return (
        <fieldset><legend>RequestsList</legend>
            {listItems}
        </fieldset>
    );
}

class LoginContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        this.checkCredentials()
        event.preventDefault();
    }
    render(){
        return (
            <fieldset><legend>LoginContainer</legend>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="username"/>
                    <input type="password" name="password"/>
                    <select name="language">
                        <option value="fr">Français</option>
                        <option value="en">English</option>
                    </select>
                    <input type="submit" value="Login" />
                </form>
            </fieldset>
        );
    }

    checkCredentials() {
        var datapost =  {
            "username": 'MDAIF',
            "password": 'HR',
            "language": 'fr',
        };

        fetch("http://localhost:8080/hr-business-services-rest/business-services/login", {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Accept-Language': 'fr-FR'
            },
            body: JSON.stringify(datapost),
            credentials: 'include'
        })
        .then((response) => response.json())
        .then((response_body) => {
            if(response_body.status == constants.REQUEST_SUCCESS){
                this.props.handleAuthentication(true);
            }
            console.log(response_body.status);
            
        })
        .catch((error) => {
            console.log("errors ", error);
        })
    }
}

function SplashContainer(props){
    return (
        <fieldset><legend>SplashContainer</legend>
             Welcome !</fieldset>
    );
}

class GpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        let value = '';
        if(target.type === 'checkbox'){
            value = target.checked?target.value:'';
        } else if (target.type === 'date'){
            value = target.value.replace(/-/g, '/');
        } else {
            value = target.value;
        }

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        console.log(this.state);
        event.preventDefault();
        let messageBody = {
            "occurrences": {
                "occurrence": [
                    {
                        "@action": "C",
                        "@datasection": "Z5A1",
                        "@domain": "PROCESS",
                        "@dossier":"58545",
                        "@population": "WORKFLOW",
                        "data": []
                    }
                ]
            }
        };

        const items = Object.keys(this.state);
        const values = Object.values(this.state);
        for (let index = 0; index < items.length; index++) {
            const element = {"item":items[index], "value":values[index]};
            messageBody.occurrences.occurrence[0].data.push(element);
        }
        console.log(messageBody);
        fetch("http://localhost:8080/hr-business-services-rest/business-services/gp/JAW0AGE0?role=EMPLOYEE(FPEFRQ000042836)&startpop=58545&lang=F&voc=FGA", {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Accept-Language': 'fr-FR'
            },
            body: JSON.stringify(messageBody),
            credentials: 'include'
        })
        .then((response) => response.json())
        .then((response_body) => {
            
            console.log(response_body.status);
            
        })
        .catch((error) => {
            console.log("errors ", error);
        })
    }

    render() {
        return (

            <fieldset><legend>GpForm</legend>
                <form onSubmit={this.handleSubmit}>
                    <select name="MOTIFA" value={this.state.MOTIFA} onChange={this.handleChange}>
                        <option value="">Saisir</option>	<option value="GNO">Activité normale</option>	<option value="CV002">ARTT</option>	<option value="CV000">CA avec traitement</option>	<option value="CD002">Cgé  org jeunesse</option>	<option value="CD003">Cgé assoc., mutuel</option>	<option value="CD004">Cgé non rému pour</option>	<option value="CG101">CNR raisons fam.</option>	<option value="CV004">Compte épargne tem</option>	<option value="CV006">Congé administrati</option>	<option value="CV005">Congé Bonifié (FPS</option>	<option value="CE001">Congé de mutation</option>	<option value="CG004">Congé de paternité</option>	<option value="CE000">Congé intercalaire</option>	<option value="CC003">Congé spécial</option>	<option value="CV001">CP fractionnement</option>	<option value="GDJ">Déjeuner</option>	<option value="CV003">JR horaires variab</option>
                    </select>
                    <input value={this.state.DATEDEB} onChange={this.handleChange} type="date" name="DATDEB" />
                    <input checked={this.state.TEMDEB?true:false} onChange={this.handleChange} type="checkbox" name="TEMDEB" value="X"/>
                    <input value={this.state.DATEFIN} onChange={this.handleChange} type="date" name="DATFIN" />
                    <input checked={this.state.TEMFIN?true:false} onChange={this.handleChange} type="checkbox" name="TEMFIN" value="X"/>
                    <input type="submit" value="Envoyer" />
                </form>
            </fieldset>
        );
    }
}

class TaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        let value = '';
        if(target.type === 'checkbox'){
            value = target.checked?target.value:'';
        } else if (target.type === 'date'){
            value = target.value.replace(/-/g, '/');
        } else {
            value = target.value;
        }

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        console.log(this.state);
        event.preventDefault();
        let messageBody = {
            "occurrences": {
                "occurrence": [
                    {
                        "@action": "C",
                        "@datasection": "Z5T1",
                        "@domain": "STEP",
                        "@dossier":"58545",
                        "@population": "WORKFLOW",
                        "data": []
                    }
                ]
            }
        };

        const items = Object.keys(this.state);
        const values = Object.values(this.state);
        for (let index = 0; index < items.length; index++) {
            const element = {"item":items[index], "value":values[index]};
            messageBody.occurrences.occurrence[0].data.push(element);
        }
        console.log(messageBody);
        fetch("http://localhost:8080/hr-business-services-rest/business-services/"+this.props.item['@quickValidate'], {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Accept-Language': 'fr-FR'
            },
            body: JSON.stringify(messageBody),
            credentials: 'include'
        })
        .then((response) => response.json())
        .then((response_body) => {
            
            console.log(response_body.status);
            
        })
        .catch((error) => {
            console.log("errors ", error);
        })
    }

    render() {
        console.log(this.props.item);
        return (

            <fieldset><legend>TaskForm</legend>
                <p>{this.props.item['@label']}</p>
                <form onSubmit={this.handleSubmit}>
                    <select name="STATUX" value={this.state.STATUX} onChange={this.handleChange}>
                        <option value="">Sélectionner un statut</option>	<option value="AP">Validé</option>	<option value="RF">Rejeté</option>
                    </select>
                    <textarea name="TXCOMM" value={this.state.TXCOMM} onChange={this.handleChange}/>
                    <input type="submit" value="Soumettre" />
                </form>
            </fieldset>
        );
    }
}

export default AppNoStyle;
