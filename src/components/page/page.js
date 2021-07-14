import React from 'react'
import './page.scss'

export default function Page({ page }) {

	const element = []
	if(page>1){
		for (let i = 0; i < page; i++) {
			element.push(
				<li className="pageBody__page">{i + 1}</li>
			)
		}
	}
	
	return (
		<ul className="pageBody">
			{element}
		</ul>
	)
}
