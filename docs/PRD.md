# Board PRD
## Post List
Show title, author, creation date, comment count. Newest first. Selecting opens detail.
Authenticated users can open post creation. Anonymous users attempting to write are sent to login, then returned to the intended destination when practical.

## Post Detail
Show title, author, creation date, body, comments. Publicly readable.

## Post Creation
Authenticated only. Title/content required. After creation open the new detail page. Anonymous direct route access goes to login. Server independently rejects unauthenticated write requests.

## Comments
Show author, content, creation date; oldest first.
Authenticated users get input/submit. Anonymous users get login guidance: "댓글을 작성하려면 로그인이 필요합니다."
Return to original post after login when practical.

## Login
Simple email/password. Establish a session and return to intended/previous page. Registration is out of scope; test users may be seeded.

## Authorization
Reads are public. Writes require authentication. Unauthenticated post/comment creation must receive an appropriate 401-style server response. UI hiding is not authorization.
