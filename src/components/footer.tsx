import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold">WriteVerse</span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              A community where ideas flourish, discussions thrive, and knowledge expands. Join us to share your
              thoughts and connect with like-minded individuals.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} WriteVerse. All rights reserved.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/announcements" className="text-muted-foreground hover:text-foreground">
                  Announcements
                </Link>
              </li>
              <li>
                <Link href="/posts" className="text-muted-foreground hover:text-foreground">
                  Posts
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Account</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/login" className="text-muted-foreground hover:text-foreground">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/join" className="text-muted-foreground hover:text-foreground">
                  Join
                </Link>
              </li>
              <li>
                <Link href="/reset-password" className="text-muted-foreground hover:text-foreground">
                  Reset Password
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
