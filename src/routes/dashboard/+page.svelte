<script lang="ts">
    import type { Metrics, ChartTemplate } from "./metric.dto";
    import Countup from "svelte-countup";
    export let data: { metricW0: Metrics, metricW1: Metrics, metricW2: Metrics, metricW3: Metrics};
    import { faComment, faRightLeft, faHeart, faUsers} from '@fortawesome/free-solid-svg-icons'
    import Fa from 'svelte-fa'

	import MyChart from "$lib/components/MyChart.svelte";



    let dataChart = {
        newUsers : {
            W0 : data.metricW0.weeklyNumberOfUsers,
            W1 : data.metricW1.weeklyNumberOfUsers,
            W2 : data.metricW2.weeklyNumberOfUsers,
            W3 : data.metricW3.weeklyNumberOfUsers
        },
        newPosts : {
            W0 : data.metricW0.numberOfPosts,
            W1 : data.metricW1.numberOfPosts,
            W2 : data.metricW2.numberOfPosts,
            W3 : data.metricW3.numberOfPosts
        },
        newLikes : {
            W0 : data.metricW0.numberOfLikes,
            W1 : data.metricW1.numberOfLikes,
            W2 : data.metricW2.numberOfLikes,
            W3 : data.metricW3.numberOfLikes
        },
        newInteraction : {
            W0 : data.metricW0.numberOfComments + data.metricW0.numberOfReposts + data.metricW0.numberOfReplies,
            W1 : data.metricW1.numberOfComments + data.metricW1.numberOfReposts + data.metricW1.numberOfReplies,
            W2 : data.metricW2.numberOfComments + data.metricW2.numberOfReposts + data.metricW2.numberOfReplies,
            W3 : data.metricW3.numberOfComments + data.metricW3.numberOfReposts + data.metricW3.numberOfReplies
        }
    }

    const mapMetric = {
        nbUser : data.metricW0.numberOfUsers,
        nbPosts : data.metricW0.numberOfPosts,
        nbLikes : data.metricW0.numberOfLikes,
        nbReposts : data.metricW0.numberOfReposts,
        nbComments : data.metricW0.numberOfComments,
        nbReplies : data.metricW0.numberOfReplies,
        weeklyNbUser : data.metricW0.weeklyNumberOfUsers,
        weeklyNbPosts : data.metricW0.weeklyNumberOfPosts,
        weeklyNbLikes : data.metricW0.weeklyNumberOfLikes,
        weeklyNbReposts : data.metricW0.weeklyNumberOfReposts,
        weeklyNbComments : data.metricW0.weeklyNumberOfComments,
        weeklyNbReplies : data.metricW0.weeklyNumberOfReplies
    }

   const chartUser : ChartTemplate = {
        type : 'line',
        title : 'Nouveaux utilisateurs',
        labels : ['Semaine 0', 'Semaine 1', 'Semaine 2', 'Semaine 3'],
        data : [dataChart.newUsers.W0, dataChart.newUsers.W1, dataChart.newUsers.W2, dataChart.newUsers.W3],
        color: ['rgba(232, 80, 47,1)']
    }

    const nbInteractions = mapMetric.nbComments + mapMetric.nbReposts + mapMetric.nbReplies;
    const chartRepartition : ChartTemplate = {
        type : 'doughnut',
        title : 'Répartition des interactions',
        labels : ['Commentaires', 'Reposts', 'Réponses'],
        data : [mapMetric.nbComments/nbInteractions*100, mapMetric.nbReposts/nbInteractions*100, mapMetric.nbReplies/nbInteractions*100],
    }
</script>

<div class="m-6" >
	<div class ="card flex flex-wrap my-6 gap-8">
		<div class="flex flex-1 justify-center items-center flex-col my-3">
            <Fa size="2x" icon={faUsers}/>
            <p class="text-6xl font-thin text-primary-500"><Countup value={mapMetric.nbUser} duration={300} step={1}/></p>
            <p class ="font-semibold">Utilisateurs</p>
		</div>
		<div class="flex flex-1 justify-center items-center flex-col my-3">
            <Fa size="2x" icon={faComment}/>
            <p class="text-6xl font-thin text-primary-500"><Countup value={mapMetric.nbPosts} duration={300} step={1}/></p>
            <p class ="font-semibold">Posts</p>
        </div>
        <div class="flex flex-1 justify-center items-center flex-col my-3">
            <Fa size="2x" icon={faHeart}/>
            <p class="text-6xl font-thin text-primary-500"><Countup value={mapMetric.nbLikes} duration={300} step={1}/></p>
            <p class ="font-semibold">Likes</p>
        </div>
        <div class="flex flex-1 justify-center items-center flex-col my-3">
            <Fa size="2x" icon={faRightLeft}/>
            <p class="text-6xl font-thin text-primary-500"><Countup value={nbInteractions} duration={300} step={1}/></p>
            <p class ="font-semibold">Interactions</p>
        </div>
	</div>
	<div class ="flex justify-between my-6 h-96" >
		<div class="card flex w-[calc(60%-8px)] justify-center">
            <MyChart dataChart={chartUser}/>
        </div>
		<div class="flex w-[calc(40%-8px)] justify-center flex-col">
            <div class="card flex flex-1 justify-center items-center h-1/4">
                <p class="text-6xl px-5 text-primary-500"><Countup value={mapMetric.weeklyNbUser} duration={1000} step={1}/></p>
                <p class ="text-center text-xl">Utilisateur actifs</p>
            </div>
            <div class="card flex flex-1 justify-center items-center p-5 flex-col mt-4 h-3/4">
                <MyChart dataChart={chartRepartition} />
            </div>
        </div>
	</div>
</div>