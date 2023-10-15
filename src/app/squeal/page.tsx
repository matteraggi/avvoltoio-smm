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
      <div className="squeal">
        <h1 className="main-card-header">Post Squeal</h1>
      </div>
    </section>
  );
};

export default page;
