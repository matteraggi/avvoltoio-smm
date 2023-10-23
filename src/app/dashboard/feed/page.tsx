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
      <div className="feed">
        <h1 className="main-card-header">Feed</h1>
      </div>
    </section>
  );
};

export default page;
