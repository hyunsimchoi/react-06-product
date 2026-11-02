import { useEffect, useState } from "react";
import styles from "./ProductDetail.module.css";
import { Link, useParams } from "react-router"

function ProductDetail() {
    const { id } = useParams();

    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("상품을 찾을 수 없습니다.");
                }
                return res.json();
            })
            .then(json => {
                setDetail(json);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <p>상품을 불러오는 중...</p>;
    }
    if (!detail) {
        return <p>상품을 찾을 수 없습니다.</p>;
    }

    return (
        <div className={styles.container}>
            <Link to="/">← 상품 목록으로</Link>

            <div className={styles.productDetail}>
                <img src={detail.thumbnail} alt={detail.title} />

                <div>
                    <h1>{detail.title}</h1>
                    <p>브랜드: {detail.brand}</p>
                    <span className={styles.badge}>{detail.category}</span>
                    <p>⭐ 평점: {detail.rating}</p>
                    <h2>${detail.price}</h2>

                    <p>{detail.description}</p>

                    <p>재고: {detail.stock}개</p>
                    <p>배송: {detail.shippingInformation}</p>
                </div>
            </div>
        </div>
    );
}


export default ProductDetail
