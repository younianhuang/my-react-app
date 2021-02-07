import React, { Component } from 'react';
import ReactDOM from 'react-dom';

function FetchPanel(props) {
    return ( 
    <div>
        <h2>Fetch Github Repositories</h2>
        <input type = "text" placeholder= {props.user} readOnly/>
        <input type = "button" value= "Fetch" onClick= {props.onClick} />
    </div> 
    );
}

function RepositoryInfo(props) {
    if(props.reposities.length == 0) {
        return null;
    }
    else { 
      const reposList = props.reposities.map( 
      (repos)=> {
          return (<div>
            <a href={repos.url} target="_blank"> 
                {repos.name} 
            </a>  
            <p>{repos.description}</p>
          </div>);
      });

      return reposList;      
    }
}

class FetchGitHub extends Component {
    constructor(props)  {
        super(props);
        this.handleClick =this.handleClick.bind(this);
        this.state = {            
            reposities: Array(0)
        }
    }

    handleClick() {        
        const url = "https://api.github.com/users/"+ this.props.user +"/repos";
        fetch(url, {method: "Get"})
        .then(res => res.json())
        .then(
            data => {
                let repos = data.map( 
                obj => { 
                    return {name:obj.name, url: obj.html_url, description: obj.description};
                });
            //console.log(data);
            //console.log(repos);
            
            this.setState({
                reposities: repos 
            })
            
        })
        .catch(e=>{
            alert(e);
        })
        
    }
        
    render() {
       return (
        <div>
          <FetchPanel 
            user = {this.props.user} 
            onClick={this.handleClick}
          />
          <RepositoryInfo reposities = {this.state.reposities} />                  
        </div>);
    }
}

  

export default FetchGitHub;
