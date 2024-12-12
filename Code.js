// Функция для создания файла в репозитории
async function createFileInRepo(filePath, fileContent) {
    const url = `https://api.github.com/repos/eenot/Random/contents/${filePath}`;
    const token = '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';
    const contentBase64 = btoa(fileContent); // Кодируем содержимое файла в Base64

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: `Create ${filePath}`,
            content: contentBase64
        })
    });

    if (!response.ok) {
        throw new Error(`Failed to create file: ${response.status} ${response.statusText}`);
    }

    return response.json(); // Возвращаем ответ от API
}

// Функция для изменения файла в репозитории
async function updateFileInRepo(filePath, fileContent) {
    const url = `https://api.github.com/repos/eenot/Random/contents/${filePath}`;
    const token = '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';

    // Получаем информацию о текущей версии файла
    const getResponse = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!getResponse.ok) {
        throw new Error(`Failed to fetch file info: ${getResponse.status} ${getResponse.statusText}`);
    }

    const fileData = await getResponse.json();
    const sha = fileData.sha; // Получаем SHA текущей версии файла
    const contentBase64 = btoa(fileContent); // Кодируем содержимое файла в Base64

    const updateResponse = await fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: `Update ${filePath}`,
            content: contentBase64,
            sha: sha
        })
    });

    if (!updateResponse.ok) {
        throw new Error(`Failed to update file: ${updateResponse.status} ${updateResponse.statusText}`);
    }

    return updateResponse.json(); // Возвращаем ответ от API
}

// Пример использования
(async () => {
    try {
        // Создание нового файла
        const createResponse = await createFileInRepo('example.txt', 'Hello, GitHub!');
        console.log('File created:', createResponse);

        // Изменение файла
        const updateResponse = await updateFileInRepo('example.txt', 'Updated content');
        console.log('File updated:', updateResponse);
    } catch (error) {
        console.error(error);
    }
})();￼Enter
