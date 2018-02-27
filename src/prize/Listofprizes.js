import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import {Pagination} from 'react-bootstrap';
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import axiosInstance from "../utils/AxiosInstance";



//Modal PopUp
class MyModal extends Component {
    render() {
        const { text, onRequestClose } = this.props;
        return (
            <Modal onRequestClose={onRequestClose} effect={Effect.ScaleUp}>
                <h2>Description of Image</h2>
                <p>{text}</p>
                <button onClick={ModalManager.close}>Close</button>
            </Modal>
        );
    }
}


class Listofprizes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            prizelink:null,
            prizeList: []
        };
        this.getPrizes = this.getPrizes.bind(this);

    }

    async getPrizes(prizelink) {
        try {
           
            this.setState({ loading: true });
            let response = await axiosInstance.get(`${prizelink}`);
            let prizeData = response.data;
            const total = prizeData.length;
            this.setState({
                loading: false,
                prizes: prizeData
              
            });
        } catch (e) {
            this.setState({ loading: false });
        }
    }

    async getName(name) {
        try {
           
            
            this.setState({
                loading: false,
                name: name
              
            });
        } catch (e) {
            this.setState({ loading: false });
        }
    }

    openModal(text) {
        ModalManager.open(<MyModal text={text} onRequestClose={() => true} />);
    }


    handlePageChange() {
      
    };



    async componentDidMount() {
        const prizelink =this.props.location.search.split("=")[1];
        const name= this.props.location.pathname.split("=")[1];
        await this.getName(name);
        await this.getPrizes(prizelink);
    }

   

    
    render() {
        var { currentpage } = this.state;
        let body = null;
       

        if (this.state.loading) {
            body = <div className="row">Loading...</div>;
        } else if (this.state.prizes) {

            const length=this.state.prizes.length;
            const per_page =28;
            const pages=(Math.ceil(this.state.prizes.length)/per_page)+1;
            currentpage=1;
            const start_offset =(currentpage - 1) * per_page;
            
            let start_count=0;

            const prizeView = this.state.prizes.map((prize,index) => {
            

                if(index >=start_offset && start_count<per_page)
                {
                    const length=this.state.prizes.length;
                    start_count++;
                    return (
                        <div className="l-wrap">
                            <div class="three-col-grid">
                                <div class="grid-item">
                                    <a onClick={() => this.openModal(prize.description)}>
                                        <img
                                            className="card-img-top"
                                            src={prize.image_url}
                                            alt={prize.description}
                                        />
                                    </a>
                                </div>
    
                            </div>
                        </div>
                    
                    );
                   
                }
            });
            
       
            body = <div className="scrolling-wrapper">
            <h2> {this.state.name} Branch
            </h2>
            
            {prizeView}


                    <Pagination 
                    items={pages} 
                    
                    >
                        
                    </Pagination>
            </div>;
        }
        return body;
    }
}

export default Listofprizes;

