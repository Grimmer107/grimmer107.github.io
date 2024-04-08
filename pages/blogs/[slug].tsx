import React from "react"
import { createClient } from "contentful"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types"
import { CopyBlock, obsidian } from "react-code-blocks"
import Link from "next/link"
import Head from "next/head"
import { motion } from "framer-motion"

const variants = {
	hidden: { opacity: 0, x: 0, y: 20 },
	enter: { opacity: 1, x: 0, y: 0 },
	exit: { opacity: 0, x: -0, y: 20 }
}

const Month = {
	"01": "January",
	"02": "February",
	"03": "March",
	"04": "April",
	"05": "May",
	"06": "June",
	"07": "July",
	"08": "August",
	"09": "September",
	"10": "October",
	"11": "November",
	"12": "December"
} as any

const client = createClient({
	space: process.env.CONTENTFUL_SPACE_ID as string,
	accessToken: process.env.CONTENTFUL_ACCESS_KEY as string
})

export const getStaticPaths = async () => {
	const res = await client.getEntries({
		content_type: "tech-blog"
	})

	const paths = res.items.map(item => {
		return {
			params: { slug: item.fields.slug }
		}
	})

	return {
		paths,
		fallback: false
	}
}

export async function getStaticProps({ params }: any) {
	const { items } = await client.getEntries({
		content_type: "tech-blog",
		"fields.slug": params.slug
	})

	if (!items.length) {
		return {
			redirect: {
				destination: "/",
				permanent: false
			}
		}
	}

	return {
		props: { blog: items[0] },
		revalidate: 100
	}
}

function getFormatedTime(time: string) {
	const timeParts = time.split("-")
	return `${timeParts[2]} ${Month[timeParts[1]]}, ${timeParts[0]}`
}

const find = (array: any, condition: any) => {
	return array.find((item: any) => condition(item))
}

const customMarkdownOptions = (content: any) => ({
	renderMark: {
		[MARKS.CODE]: (text: any) => (
			<span className="bg-[#282c34] text-white border-[#6e6e8966] border-[1px] px-[0.3em] py-[0.1em] rounded-[0.25em]">
				{text}
			</span>
		)
	},
	renderNode: {
		[BLOCKS.HEADING_4]: (node: any, children: any) => {
			return (
				<h4 className="text-primary text-[1.1rem] mt-[1rem] font-ubuntu font-semibold">
					{children}
				</h4>
			)
		},
		[INLINES.HYPERLINK]: (node: any, children: any) => {
			return (
				<Link
					href={node.data.uri}
					className="text-secondary cursor-pointer hover:underline"
				>
					{children}
					<svg
						stroke="#2bbc8a"
						fill="#2bbc8a"
						strokeWidth="0"
						viewBox="0 0 24 24"
						className="inline ml-1"
						aria-hidden="true"
						height="1.25em"
						width="1.25em"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="m13 3 3.293 3.293-7 7 1.414 1.414 7-7L21 11V3z"></path>
						<path d="M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z"></path>
					</svg>
				</Link>
			)
		},
		[BLOCKS.PARAGRAPH]: (node: any, children: any) => {
			if (
				find(node.content[0].marks, (mark: any) => mark.type === "code")
			) {
				return (
					<div className="my-[1em] bg-[#282c34] p-[2px]">
						<CopyBlock
							text={node.content[0].value}
							language={"jsx"}
							showLineNumbers={false}
							wrapLongLines={true}
							codeBlock
							theme={obsidian}
						/>
					</div>
				)
			}

			return <p>{children}</p>
		}
	}
})

function renderBlogContent(blogContent: any) {
	return documentToReactComponents(
		blogContent,
		customMarkdownOptions(blogContent)
	)
}

export default function Blog({ blog }: any) {
	if (!blog) {
		return (
			<section className="text-primary text-[1.25rem] text-center font-ubuntu flex flex-col justify-center align-middle m-auto w-[50%] mx-auto h-[85vh] pt-[8em]">
				Loading....
			</section>
		)
	}

	const { title, readingTime, blogContent, publishedTime, tags } = blog.fields

	return (
		<motion.section
			initial={"hidden"}
			animate={"enter"}
			exit={"exit"}
			variants={variants}
			transition={{ duration: 0.4, type: "easeInOut" }}
			className="flex flex-row justify-center align-middle m-auto w-[100%] min-h-[20em] pt-[2em]"
		>
			<Head>
				<title>Blog | {title}</title>
			</Head>
			<div className="w-[80%] mx-auto border-t-[1px] flex flex-col border-[#413f3f] mt-[4em] ml-[4em] pt-[2em] pr-[1em]">
				<div className="flex flex-row text-[#a1a1aa] text-[1rem] justify-items-start align-middle mt-[0.5em] mb-[1em] font-normal">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="inline-block fill-[#a1a1aa] h-6 scale-75 w-[1.375rem] my-auto"
						aria-hidden="true"
					>
						<path d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z"></path>
						<path d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z"></path>
					</svg>
					<p className="my-auto ml-[0.25em]">
						{getFormatedTime(publishedTime)}
					</p>
					<svg
						stroke="#a1a1aa"
						fill="#a1a1aa"
						strokeWidth="0"
						viewBox="0 0 24 24"
						height="1.2em"
						width="1.2em"
						xmlns="http://www.w3.org/2000/svg"
						className="scale-110 my-auto ml-[3em]"
					>
						<path d="M12.25 2c-5.514 0-10 4.486-10 10s4.486 10 10 10 10-4.486 10-10-4.486-10-10-10zM18 13h-6.75V6h2v5H18v2z"></path>
					</svg>
					<p className="my-auto ml-[0.5em]">{readingTime} min</p>
				</div>
				<p className="text-primary font-ubuntu text-[1.75em] mb-[1em]">
					{title}
				</p>
				<div className="text-white font-fira font-light text-[0.85em] opacity-80">
					{renderBlogContent(blogContent)}
				</div>
			</div>
			<div className="flex flex-start flex-col border-l-[1px] border-t-[1px] border-[#413f3f] text-white w-[20em] text-[0.8rem] mt-[5em] pt-[2em] mr-[3em] pl-[2em] pr-[1em]">
				<div className="w-[100%] font-fira text-lg mt-[0.5em]">
					<h4 className="text-lg">Tags</h4>
				</div>
				<div className="w-[100%] mt-[1em] flex flex-wrap items-center gap-x-[0.1em] gap-y-3 tracking-tight">
					{tags.map((tag: string) => (
						<span
							className="border-[1px] border-[#40405866] font-semibold bg-zinc-800 mr-[1em] px-2 py-1 text-[0.85rem] rounded-md"
							key={tag}
						>
							{tag}
						</span>
					))}
				</div>
			</div>
		</motion.section>
	)
}
