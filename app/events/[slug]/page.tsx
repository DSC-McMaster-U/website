"use client"
import { useParams } from 'next/navigation';
import EventCard from "@/app/components/EventCard";
import Header from "@/app/components/Header";
interface Event {
    start_date: string,
    event_type: string,
    title: string,
    description_short: string,
    picture: string,
    id: number,
  }

export default function EventPage() {
    const { slug } = useParams(); 
    return <p>Post: {slug}</p>
}