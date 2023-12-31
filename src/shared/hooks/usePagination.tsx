import { useState } from 'react';

export default function usePagination<T>(data: T[], itemsPerPage: number) {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const countPage = Math.ceil(data.length / itemsPerPage);
	const minPage = 1;

	function getCurrentData(): T[] {
		const start = (currentPage - 1) * itemsPerPage;
		const end = start + itemsPerPage;
		return data.slice(start, end);
	}

	function next() {
		setCurrentPage((currentPage) => Math.min(currentPage + 1, countPage));
	}

	function prev() {
		setCurrentPage((currentPage) => Math.max(currentPage - 1, minPage));
	}

	function setPagePaginate(page: number) {
		const pageNumber = Math.max(1, page);
		setCurrentPage(() => Math.min(pageNumber, countPage));
	}

	return {
		currentPage,
		getCurrentData,
		countPage,
		next,
		prev,
		setPagePaginate,
	};
}
