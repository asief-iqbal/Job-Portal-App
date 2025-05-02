import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { Building2, MapPin, Clock, DollarSign, ArrowRight, Star, TrendingUp, Zap } from 'lucide-react'
import { dummyJobs } from '../utils/dummyData'

const LatestJobCards = () => {
    const navigate = useNavigate();
    const [visibleJobs, setVisibleJobs] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        // Simulate loading animation
        const timer = setTimeout(() => {
            setVisibleJobs(dummyJobs);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleJobs.map((job, index) => (
                <div 
                    key={job._id}
                    onClick={() => navigate(`/description/${job._id}`)} 
                    className={`group card glass-card gradient-border cursor-glow ${isVisible ? 'fade-in' : 'opacity-0'}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                >
                    <div className="p-6 space-y-4">
                        {/* Company Info */}
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 pulse-ring">
                                <Building2 className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors neon-text">
                                    {job.company.name}
                                </h3>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <MapPin className="h-4 w-4" />
                                    <span>{job.location}</span>
                                </div>
                            </div>
                            <div className="ml-auto">
                                <Star className="h-5 w-5 text-yellow-400 group-hover:scale-110 transition-transform floating" />
                            </div>
                        </div>

                        {/* Job Title & Description */}
                        <div className="space-y-2">
                            <h2 className="font-bold text-xl group-hover:text-primary transition-colors neon-text">
                                {job.title}
                            </h2>
                            <p className="text-muted-foreground line-clamp-2 group-hover:text-foreground transition-colors">
                                {job.description}
                            </p>
                        </div>

                        {/* Job Details */}
                        <div className="flex flex-wrap gap-2 pt-2">
                            <Badge variant="secondary" className="flex items-center gap-1 group-hover:bg-primary/10 transition-colors">
                                <Clock className="h-3 w-3" />
                                {job.jobType}
                            </Badge>
                            <Badge variant="secondary" className="flex items-center gap-1 group-hover:bg-primary/10 transition-colors">
                                <DollarSign className="h-3 w-3" />
                                {job.salary} LPA
                            </Badge>
                            <Badge variant="secondary" className="flex items-center gap-1 group-hover:bg-primary/10 transition-colors">
                                {job.position} Positions
                            </Badge>
                        </div>

                        {/* Requirements Preview */}
                        <div className="pt-2">
                            <div className="flex flex-wrap gap-1">
                                {job.requirements.slice(0, 2).map((req, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs group-hover:border-primary/50 transition-colors">
                                        {req}
                                    </Badge>
                                ))}
                                {job.requirements.length > 2 && (
                                    <Badge variant="outline" className="text-xs group-hover:border-primary/50 transition-colors">
                                        +{job.requirements.length - 2} more
                                    </Badge>
                                )}
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <TrendingUp className="h-4 w-4 text-primary" />
                                <span>High Demand</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Zap className="h-4 w-4 text-primary" />
                                <span>Quick Apply</span>
                            </div>
                        </div>

                        {/* Apply Button */}
                        <div className="pt-4">
                            <button className="btn btn-primary w-full group shimmer">
                                Apply Now
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default LatestJobCards