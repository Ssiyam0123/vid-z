"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Film } from "lucide-react";

export default function SeriesEpisodesPage() {
  const { id } = useParams();
  const [series, setSeries] = useState<any>(null);
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const fetchVideos = async () => {
    try {
      const res = await fetch(`/api/series/${id}/videos`);
      const data = await res.json();
      if (data.videos) setVideos(data.videos);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
     fetch(`/api/series/${id}`)
      .then(res => res.json())
      .then(data => {
        if(data.series) setSeries(data.series);
      });
     fetchVideos().then(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    const isGenerating = videos.some(v => v.status && v.status !== 'completed' && v.status !== 'draft' && v.status !== 'failed');
    if(isGenerating) {
      const interval = setInterval(fetchVideos, 3000);
      return () => clearInterval(interval);
    }
  }, [videos]);

  const handleAddEpisode = async () => {
    setCreating(true);
    try {
      const res = await fetch(`/api/series/${id}/videos`, { method: "POST" });
      const data = await res.json();
      if(data.video) {
        setVideos(prev => [...prev, data.video]);
      }
    } catch(e) {
      alert("Failed to create episode");
    } finally {
      setCreating(false);
    }
  };

  const generateSingleVideo = async (videoId: string) => {
    try {
      setVideos(prev => prev.map(v => v._id === videoId ? { ...v, status: 'scripting' } : v));
      await fetch(`/api/videos/${videoId}/generate`, { method: "POST" });
    } catch(e) {
      alert("Trigger failed");
    }
  };

  const getProgress = (status: string) => {
    switch(status) {
        case 'scripting': return 15;
        case 'audio_generating': return 35;
        case 'captioning': return 50;
        case 'image_generating': return 70;
        case 'rendering': return 90;
        case 'completed': return 100;
        default: return 0;
    }
  };

  if(loading) return <div className="p-20 text-center animate-pulse text-cyan-500 font-semibold tracking-widest">LOADING EPISODES...</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{series?.seriesTitle || "Untitled Series"}</h1>
        <p className="text-muted-foreground mt-2">{series?.seriesDescription || "Manage your episodic content below."}</p>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Episodes List</h2>
          <button 
             onClick={handleAddEpisode}
             disabled={creating}
             className="text-sm font-medium px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-400 disabled:opacity-50 transition-colors"
          >
            {creating ? "Adding..." : "+ Add Episode"}
          </button>
        </div>
        
        {videos.length > 0 ? (
          <div className="divide-y divide-border">
            {videos.map(video => (
              <div key={video._id} className="p-6 flex flex-col md:flex-row items-start lg:items-center justify-between hover:bg-accent/50 transition-colors gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                    <Film className="h-6 w-6 text-cyan-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground ">{video.title || `Episode ${video.order}`}</h3>
                    <p className="text-sm text-muted-foreground flex gap-2 items-center">
                      <span className="uppercase text-xs tracking-wider">Episode {video.order}</span>
                      <span>•</span>
                      <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 w-full lg:w-auto overflow-hidden">
                  {video.status === "completed" && video.generatedVideo?.url && (
                    <Link href={video.generatedVideo.url} target="_blank">
                       <button className="px-4 py-2 bg-background border border-border shadow-sm text-sm text-foreground font-medium rounded-lg hover:bg-accent hover:text-cyan-500 transition-colors">
                          Watch Video
                       </button>
                    </Link>
                  )}
                  {video.status && video.status !== 'completed' && video.status !== 'draft' && video.status !== 'failed' && (
                    <div className="w-full min-w-[200px] flex flex-col gap-1.5 mr-2">
                      <div className="flex justify-between items-center">
                          <span className="text-[11px] font-semibold text-amber-500 uppercase tracking-wider animate-pulse flex items-center gap-1.5">
                             <span className="h-1.5 w-1.5 bg-amber-500 rounded-full"></span>
                             {video.status.replace('_', ' ')}...
                          </span>
                          <span className="text-[11px] font-semibold text-amber-500/70">{getProgress(video.status)}%</span>
                      </div>
                      <div className="w-full bg-amber-500/10 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-amber-500 h-1.5 transition-all duration-[3000ms] ease-linear rounded-full" style={{ width: `${getProgress(video.status)}%` }} />
                      </div>
                    </div>
                  )}
                  {(!video.status || video.status === 'draft' || video.status === 'failed') && (
                     <>
                      {video.status === 'failed' && (
                        <span className="text-xs font-semibold text-destructive uppercase tracking-wider mr-2 hidden md:block">Failed</span>
                      )}
                      <button 
                        onClick={() => generateSingleVideo(video._id)}
                        className="px-4 py-2 bg-cyan-500 shadow-sm text-sm text-white font-medium rounded-lg hover:bg-cyan-400 transition-colors shrink-0"
                      >
                        Generate Episode
                      </button>
                     </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
             <div className="p-8 text-center bg-accent/20">
               <p className="text-muted-foreground">No episodes have been generated for this series yet.</p>
             </div>
        )}
      </div>
    </div>
  );
}
