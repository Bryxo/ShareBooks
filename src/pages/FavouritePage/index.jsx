import React from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import "./index.module.scss";
import axios from "axios";
import { Card, Button } from "antd";
import styles from "./index.module.scss";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { books, favBooks, addFav} from "../../api/favBooks";
import { Link } from "react-router-dom";

const { Meta } = Card;
// const FAVOURITE_BD_PATH = "https://anapioficeandfire.com/api/books";

class FavouritePage extends React.Component {
  state = {
    isLoading: true,
    favBooksList: [],
  };

  getBooks = () => {
      const favBooksList = favBooks;
      this.setState({ favBooksList: favBooksList, isLoading: false });
    this.allFavourite();
  };

  componentDidMount() {
    this.getBooks();
  }

  allFavourite() {
    this.setState((prevState) => {
      const updatedFavBooksList = prevState.favBooksList.map((obj) => ({
        ...obj,
        isFavourite: true,
      }));
      return {
        favBooksList: updatedFavBooksList,
      };
    });
  }

  unfavourite(id) {
    this.setState((prevState) => {
      const updatedFavBooksList = prevState.favBooksList.map((obj) => {
        if (obj.id === id) {
          return { ...obj, isFavourite: false };
        }
        return obj;
      });

      return {
        favBooksList: updatedFavBooksList,
      };
    });
  }

  render() {
    const { isLoading, favBooksList } = this.state;
// const FavouritePage = () => {
    return (
      <DefaultLayout>
        <div className={styles.container}>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css"
          />
          <h1> Вот список книг, на которые вы подписаны:</h1>
          <div className={styles.content}>
            {isLoading
              ? "Loading..."
              : 
              favBooksList.map((book) => {
                  if (book.isFavourite) {
                    return (
                      <div className={styles.bookBlock} key={book.id}>
                        <Button
                          className={styles.favBtn}
                          icon={<StarFilled />}
                          style={{ color: "#C44536" }}
                          onClick={() => (addFav(book.id), this.unfavourite(book.id))}
                        />
                        <Link className={styles.link} to={'/' + (book.id)}>
                          <Card
                            hoverable
                            className={styles.card}
                            style={{ width: 300 }}
                            // key={book.id}
                            cover={<img alt="example" src={book.img} />}
                            // extra={
                            //   <>
                            //   <Button
                            //     icon={<StarFilled />}
                            //     style={{ color: "#C44536" }}
                            //     onClick={() => (addFav(book.id), this.unfavourite(book.id))}
                            //   />
                            // }
                          >
                            <Meta title={book.name} description={book.author} />
                          </Card>
                        </Link>
                      </div>
                    );}
                })}
          </div>
        </div>
      </DefaultLayout>
    );
  }
}

export default FavouritePage;
