import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";

const page = () => {
  return (
    <section>
      <div className="arrow-back">
        <Link href="/dashboard">
          <ArrowBackIcon sx={{ fontSize: 50 }} />
        </Link>
      </div>
      <div className="trend">
        <h1 className="main-card-header">Trend Post</h1>
      </div>
    </section>
  );
};

export default page;
