import { Link } from "@assemble-ui/react";

export function LinkDemo() {
  return (
    <div className="demo-preview">
      <p>
        <Link href="#components" underline="always">
          Link luôn có underline
        </Link>
      </p>

      <p>
        <Link href="#patterns" underline="hover">
          Link underline khi hover
        </Link>
      </p>

      <p>
        <Link
          href="https://example.com"
          external
        >
          Link bên ngoài
        </Link>
      </p>
    </div>
  );
}
