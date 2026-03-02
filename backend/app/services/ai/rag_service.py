from __future__ import annotations
import faiss
import numpy as np


class RAGService:
    def __init__(self, dim: int = 1536) -> None:
        self.index = faiss.IndexFlatIP(dim)
        self.payloads: list[str] = []

    def add_embedding(self, vector: list[float], text: str) -> None:
        array = np.array([vector], dtype="float32")
        self.index.add(array)
        self.payloads.append(text)

    def search(self, vector: list[float], k: int = 3) -> list[str]:
        if self.index.ntotal == 0:
            return []
        query = np.array([vector], dtype="float32")
        _, indices = self.index.search(query, k)
        return [self.payloads[i] for i in indices[0] if i >= 0]
