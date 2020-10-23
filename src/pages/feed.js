import { Hidden } from "@material-ui/core";
import React from "react";
import FeedPostSkeleton from "../components/feed/FeedPostSkeleton";
// import FeedPost from "../components/feed/FeedPost";
import FeedSideSuggestions from "../components/feed/FeedSideSuggestions";
import Layout from "../components/shared/Layout";
import LoadingScreen from "../components/shared/LoadingScreen";
import UserCard from "../components/shared/UserCard";
import { getDefaultPost } from "../data";
import { LoadingLargeIcon } from "../icons";
import { useFeedPageStyles } from "../styles";
const FeedPost = React.lazy(() => import('../components/feed/FeedPost'))

function FeedPage() {
  const classes = useFeedPageStyles();
  const [isEndOfFeed] = React.useState(false)

  let loading = false;
  if(loading) return <LoadingScreen />

  return (
    <Layout>
      <div className={classes.container}>
        {/* Feed Post */}
        <div>
          {Array.from({ length: 5 }, () => getDefaultPost()).map((post, index) => (
            <React.Suspense key={post.id} fallback={<FeedPostSkeleton />}>
              <FeedPost index={index} post={post} />
            </React.Suspense>
          ))}
        </div>
        {/* Side Bar */}
        <Hidden smDown>
            <div className={classes.sidebarContainer}>
              <div className={classes.sidebarWrapper}>
                <UserCard avatarSize={50} />
                <FeedSideSuggestions />
              </div>
            </div>
        </Hidden>
        {!isEndOfFeed && <LoadingLargeIcon />}
      </div>
    </Layout>
  )
}

export default FeedPage;
