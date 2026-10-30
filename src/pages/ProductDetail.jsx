import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

function ProductDetail() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
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
                setProduct(json);
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

    if (!product) {
        return <p>상품을 찾을 수 없습니다.</p>;
    }

    return (
        <div className="container">
            <Link to="/">← 상품 목록으로</Link>

            <div className="product-detail">
                <img src={product.thumbnail} alt={product.title} />

                <div>
                    <h1>{product.title}</h1>
                    <p>브랜드: {product.brand}</p>
                    <p>⭐ 평점: {product.rating}</p>
                    <h2>${product.price}</h2>

                    <p>{product.description}</p>

                    <p>재고: {product.stock}개</p>
                    <p>배송: {product.shippingInformation}</p>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
