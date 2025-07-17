import { apiInitializer } from "discourse/lib/api";
import { ajax } from "discourse/lib/ajax";

export default apiInitializer((api) => {

    if(api.getCurrentUser().trust_level >= settings.min_trust_level_for_needs_love) {
    
        // Show the "Left Behind" link
        function __customization_addDays(date_, days) {
            var date = new Date(date_.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        }
        //https://stackoverflow.com/questions/563406/add-days-to-javascript-date
        var date = new Date();
        
        var twoDaysAgo = __customization_addDays(date, - settings.min_days_needs_love);
        //https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
        var twoDaysAgoString = twoDaysAgo.toISOString().split('T')[0]
    
        var monthAgo = __customization_addDays(date, - settings.max_days_needs_love);
        var monthAgoString = monthAgo.toISOString().split('T')[0]
    
        
        var search_query = "?q=status%3Aunsolved%20status%3Asingle_user%20before%3A" + twoDaysAgoString + "%20after%3A" + monthAgoString + "%20-tags%3Ano-solution-needed%20%20order%3Alatest";
        var left_behind_url = "/search" + search_query;
    
        api.addNavigationBarItem({
          name: "left-behind",
          displayName: "Needs Love",
          title: "topics that didn't get any attention and need some love",
          href: left_behind_url
        });
          
        // More aggresive - a small banner on first page load
        if(api.getCurrentUser().trust_level >= settings.min_trust_level_for_needs_love_banner) {
            api.onPageChange((url, title) => {
                //var isCategory = url.startsWith("/c/");
                if(url == "/" || url == "/new" || url == "/latest" ||
                url == "/top") {
                    ajax("/search.json" + search_query).then (function(result){
                        var numPosts = result.posts.length;
                        if(numPosts > settings.min_needs_love_posts_for_banner || 
                            (isCategory && numPosts > settings.min_needs_love_posts_for_banner_category)) {
                            $('#left-behind-msg').addClass("active").html("<a class='alert alert-info clickable' href='" + left_behind_url + "'>Click to see " + numPosts + " topics that are left behind and need some love.</a>");
                        }
                    });
                }
            });
        }
    }});

