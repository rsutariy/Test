import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import Pagination from "react-paginating";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import axiosInstance from "../utils/AxiosInstance";


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
            currentPage: 1,
            prizePageLink:null,
            prizeList: []
        };

        this.getPrizes = this.getPrizes.bind(this);

    }

    async getPrizes(prizelink) {
        try {
            this.setState({ loading: true });
            let response = await axiosInstance.get(`${prizelink}`);
            console.log(response);
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
    openModal(text) {
        ModalManager.open(<MyModal text={text} onRequestClose={() => true} />);
    }


    handlePageChange = page => {
        this.setState({
            currentPage: page
        });
    };

    async componentDidMount() {
        const prizelink ="le1.json";
        console.log(prizelink);
        await this.getPrizes(prizelink);
    }


    render() {
        const { currentPage } = this.state;
        let body = null;

        if (this.state.loading) {
            body = <div className="row">Loading...</div>;
        } else if (this.state.prizes) {
            const length=this.state.prizes.length;

            const prizeView = this.state.prizes.map(prize => {

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
            });
            
            
            body = <div className="scrolling-wrapper">{prizeView}
                    <Pagination
                        total={length}
                        limit={28}
                        currentPage={currentPage}>
                        {({pages,
                            currentPage,
                            hasNextPage,
                            hasPreviousPage,
                            previousPage,
                            nextPage,        
                            getPageItemProps}) => (
                                <div>
                                    {hasPreviousPage && (
                                        <button className="btn btn-secondary"
                                            {...getPageItemProps({
                                                pageValue: previousPage,
                                                onPageChange: this.handlePageChange
                                            }) }
                                        >
                                            {"<"}
                                        </button>
                                    )}
                                    {hasNextPage && (
                                        <button className="btn btn-secondary"
                                            {...getPageItemProps({
                                                pageValue: nextPage,
                                                onPageChange: this.handlePageChange
                                            }) }
                                        >
                                            {">"}
                                        </button>
                                    )}

                                </div>
                            )}
                    </Pagination>
            
            </div>;
        }
        return body;
    }
}

export default Listofprizes;