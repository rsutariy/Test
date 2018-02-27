import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import { Pagination } from 'react-bootstrap';
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
            prizelink: null,
            prizeList: [],
            currentpage: 1
        };
        this.getPrizes = this.getPrizes.bind(this);

    }

    //Function for getting prizes from json file
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

    //Function for getting heading of page
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


    //Open Modal Pop Up
    openModal(text) {
        ModalManager.open(<MyModal text={text} onRequestClose={() => true} />);
    }


    handlePageChange() {

    };


    //Call getPrizes Function
    async componentDidMount() {
        const prizelink = this.props.location.search.split("=")[1];
        const name = this.props.location.pathname.split("=")[1];
        await this.getName(name);
        await this.getPrizes(prizelink);
    }




    render() {

        let body = null;
        if (this.state.loading) {
            body = <div className="row">Loading...</div>;
        } else if (this.state.prizes) {

            const length = this.state.prizes.length;
            const per_page = 28;
            const pages = (Math.ceil(this.state.prizes.length) / per_page);
            let start_count = 0;

            const prizeView = this.state.prizes.map((prize, index) => {

                const start_offset = (this.state.currentpage - 1) * per_page;
                if (index >= start_offset && start_count < per_page) {
                    const length = this.state.prizes.length;
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
            <h4>Page 1 of {Math.round(pages+1)}</h4>

                {prizeView}
                <Pagination className="pagination"
                    next
                    prev
                    items={pages}
                    currentpage={this.state.currentpage}
                    onClick={this.handlePageChange} >
                </Pagination>
            </div>;
        }
        return body;
    }
}

export default Listofprizes;

