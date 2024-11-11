import { useParams } from "react-router-dom";
import Header from "../../components/main/Header";

export default function MovieDetailsPage() {
  const { id } = useParams();

  return (
    <>
      <Header />
      <p>MOVIE DETAIL</p>
    </>
  );
}
