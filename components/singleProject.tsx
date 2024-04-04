import React from "react"
import Image from "next/image"
import Link from "next/link"

export default function SingleProject(props: any) {
	const { title, featuredText, projectUrl } = props

	return (
		<Link href={"#"}>
			<div className="bg-[#18181B] border-[1px] border-[#27272A] transition-all duration-400 ease-linear shadow-md shadow-black hover:shadow-lg hover:shadow-black h-[20em] w-[20em] rounded-[1em] flex flex-col justify-start">
				<div className="w-[19.9em] h-[10em] overflow-clip relative rounded-t-[1em]">
					<Image
						src={"/inkdrop.webp"}
						alt={"project feature image"}
						layout={"fill"}
						objectFit={"cover"}
						className="transition-transform duration-500 transform ease-out hover:scale-125"
					/>
				</div>
				<div className="flex flex-col p-[1em]">
					<p className="text-primary font-ubuntu text-[1.1rem] font-semibold">
						{title}
					</p>
					<p className="text-white font-oxygen opacity-80 text-[0.8rem]">
						{featuredText}
					</p>
					<div
						data-ripple-light="true"
						className="border-[1px] mt-[2em] py-[0.25em] text-primary bg-[#18181B] transition-colors duration-200 ease-linear rounded-[0.5em] border-[#27272A] hover:bg-primary hover:text-black text-[0.9em] font-ubuntu font-semibold text-center"
					>
						<p role="button">Details</p>
					</div>
				</div>
			</div>
		</Link>
	)
}